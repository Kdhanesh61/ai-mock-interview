package com.mockinterview.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mockinterview.dto.QuestionResponse;
import com.mockinterview.entity.Interview;
import com.mockinterview.entity.Question;
import com.mockinterview.repository.InterviewRepository;
import com.mockinterview.repository.QuestionRepository;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    private final InterviewRepository interviewRepository;

    private final AiInterviewService aiInterviewService;


    public QuestionService(
            QuestionRepository questionRepository,
            InterviewRepository interviewRepository,
            AiInterviewService aiInterviewService) {

        this.questionRepository = questionRepository;

        this.interviewRepository = interviewRepository;

        this.aiInterviewService = aiInterviewService;
    }


    // =====================================================
    // GET QUESTIONS BY INTERVIEW
    // =====================================================

    public List<QuestionResponse> getQuestionsByInterview(
            Long interviewId) {

        Interview interview =
                interviewRepository.findById(interviewId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Interview not found"
                                )
                        );


        List<Question> questions =
                questionRepository.findByInterviewId(
                        interview.getId()
                );


        List<QuestionResponse> responses =
                new ArrayList<>();


        for (Question question : questions) {

            QuestionResponse response =
                    convertToResponse(question);

            responses.add(response);
        }


        return responses;
    }


    // =====================================================
    // GENERATE QUESTIONS
    // =====================================================

    public List<QuestionResponse> generateQuestions(
            Long interviewId,
            int count) {


        // -------------------------------------------------
        // FIND INTERVIEW
        // -------------------------------------------------

        Interview interview =
                interviewRepository.findById(interviewId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Interview not found"
                                )
                        );


        // -------------------------------------------------
        // VALIDATE COUNT
        // -------------------------------------------------

        if (count <= 0 || count > 20) {

            throw new RuntimeException(
                    "Question count must be between 1 and 20"
            );
        }


        // -------------------------------------------------
        // GET INTERVIEW INFORMATION
        // -------------------------------------------------

        String programmingLanguage =
                interview.getProgrammingLanguage();

        String category =
                interview.getCategory();

        String difficulty =
                interview.getDifficulty();


        // -------------------------------------------------
        // DEFAULT VALUES
        // -------------------------------------------------

        if (programmingLanguage == null ||
                programmingLanguage.isBlank()) {

            programmingLanguage = "Java";
        }


        if (category == null ||
                category.isBlank()) {

            category = "Basic Programming";
        }


        if (difficulty == null ||
                difficulty.isBlank()) {

            difficulty = "Beginner";
        }


        // -------------------------------------------------
        // PROMPT FOR QWEN3
        // -------------------------------------------------

        String prompt = """
                You are an expert technical interviewer.

                Conduct an interview for a fresher.

                Generate exactly %d questions.

                Programming Language: %s
                Category: %s
                Difficulty: %s

                RULES:

                1. Every question must match the programming
                   language.

                2. Every question must match the category.

                3. Every question must match the difficulty.

                4. Questions must be suitable for a fresher.

                5. Do not mix programming languages.

                6. Do not provide answers.

                7. Do not provide explanations.

                8. Do not provide hints.

                9. Do not provide headings.

                10. Do not number the questions.

                11. Return exactly one question on each line.

                12. Return ONLY the questions.

                Example format:

                What is a class in Java?
                What is inheritance in Java?
                What is method overloading in Java?

                Now generate exactly %d questions.
                """.formatted(
                        count,
                        programmingLanguage,
                        category,
                        difficulty,
                        count
                );


        System.out.println(
                "=========================================="
        );

        System.out.println(
                "Generating questions using Ollama"
        );

        System.out.println(
                "Interview ID: " + interviewId
        );

        System.out.println(
                "Language: " + programmingLanguage
        );

        System.out.println(
                "Category: " + category
        );

        System.out.println(
                "Difficulty: " + difficulty
        );

        System.out.println(
                "Count: " + count
        );

        System.out.println(
                "=========================================="
        );


        // -------------------------------------------------
        // CALL OLLAMA / QWEN3
        // -------------------------------------------------

        String result =
                aiInterviewService.askAI(prompt);


        if (result == null ||
                result.isBlank()) {

            throw new RuntimeException(
                    "Ollama did not return any questions"
            );
        }


        System.out.println(
                "Ollama response:"
        );

        System.out.println(result);


        // -------------------------------------------------
        // CLEAN RESPONSE
        // -------------------------------------------------

        result = cleanAiResponse(result);


        // -------------------------------------------------
        // SPLIT QUESTIONS
        // -------------------------------------------------

        String[] generatedQuestions =
                result.split("\\r?\\n");


        List<QuestionResponse> responses =
                new ArrayList<>();


        // -------------------------------------------------
        // SAVE QUESTIONS
        // -------------------------------------------------

        for (String text : generatedQuestions) {

            text = text.trim();


            if (text.isEmpty()) {
                continue;
            }


            // Remove numbering such as:
            //
            // 1. Question
            // 2) Question
            // 3 - Question
            //

            text = text.replaceFirst(
                    "^\\s*\\d+[.)\\-:]\\s*",
                    ""
            ).trim();


            // Remove bullet points

            text = text.replaceFirst(
                    "^[-*•]\\s*",
                    ""
            ).trim();


            if (text.isEmpty()) {
                continue;
            }


            // -------------------------------------------------
            // SAVE QUESTION
            // -------------------------------------------------

            Question question =
                    new Question();


            question.setQuestion(
                    text
            );


            question.setCategory(
                    category
            );


            question.setDifficulty(
                    difficulty
            );


            question.setInterview(
                    interview
            );


            Question savedQuestion =
                    questionRepository.save(
                            question
                    );


            // -------------------------------------------------
            // RESPONSE
            // -------------------------------------------------

            QuestionResponse response =
                    convertToResponse(
                            savedQuestion
                    );


            responses.add(
                    response
            );


            // -------------------------------------------------
            // STOP AT REQUESTED COUNT
            // -------------------------------------------------

            if (responses.size() >= count) {

                break;
            }
        }


        // -------------------------------------------------
        // VALIDATE RESULT
        // -------------------------------------------------

        if (responses.isEmpty()) {

            throw new RuntimeException(
                    "AI did not generate any valid questions"
            );
        }


        System.out.println(
                "Questions successfully generated: "
                        + responses.size()
        );


        return responses;
    }


    // =====================================================
    // CLEAN AI RESPONSE
    // =====================================================

    private String cleanAiResponse(
            String result) {

        String cleaned =
                result.trim();


        // Remove markdown code fences

        cleaned =
                cleaned.replace(
                        "```text",
                        ""
                );

        cleaned =
                cleaned.replace(
                        "```",
                        ""
                );


        return cleaned.trim();
    }


    // =====================================================
    // CONVERT ENTITY → RESPONSE
    // =====================================================

    private QuestionResponse convertToResponse(
            Question question) {

        QuestionResponse response =
                new QuestionResponse();


        response.setId(
                question.getId()
        );


        response.setQuestion(
                question.getQuestion()
        );


        response.setCategory(
                question.getCategory()
        );


        response.setDifficulty(
                question.getDifficulty()
        );


        if (question.getInterview() != null) {

            response.setInterviewId(
                    question.getInterview().getId()
            );
        }


        return response;
    }
}