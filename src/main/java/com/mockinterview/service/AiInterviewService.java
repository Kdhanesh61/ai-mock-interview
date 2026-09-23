package com.mockinterview.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import com.mockinterview.entity.Interview;
import com.mockinterview.entity.Question;
import com.mockinterview.repository.InterviewRepository;
import com.mockinterview.repository.QuestionRepository;

@Service
public class AiInterviewService {

    private final QuestionRepository questionRepository;

    private final ChatClient chatClient;

    private final InterviewRepository interviewRepository;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public AiInterviewService(
            ChatClient.Builder builder,
            QuestionRepository questionRepository,
            InterviewRepository interviewRepository) {

        this.chatClient = builder.build();

        this.questionRepository = questionRepository;

        this.interviewRepository = interviewRepository;
    }


    // =====================================================
    // ASK OLLAMA + QWEN3
    // =====================================================

    public String askAI(String prompt) {

        try {

            System.out.println();
            System.out.println("==========================================");
            System.out.println("Sending request to Ollama...");
            System.out.println("==========================================");

            String response =
                    chatClient
                            .prompt()
                            .user(prompt)
                            .call()
                            .content();


            if (response == null ||
                    response.trim().isEmpty()) {

                throw new RuntimeException(
                        "Ollama returned an empty response"
                );
            }


            System.out.println();
            System.out.println("==========================================");
            System.out.println("Ollama response received");
            System.out.println("==========================================");


            return cleanResponse(response);


        } catch (Exception e) {

            System.err.println();
            System.err.println("==========================================");
            System.err.println("OLLAMA ERROR");
            System.err.println("==========================================");

            e.printStackTrace();


            throw new RuntimeException(
                    "Failed to generate content from Ollama: "
                            + e.getMessage(),
                    e
            );
        }
    }


    // =====================================================
    // CLEAN AI RESPONSE
    // =====================================================

    private String cleanResponse(
            String response) {

        String result =
                response.trim();


        // Remove markdown code fences

        result =
                result.replace(
                        "```text",
                        ""
                );

        result =
                result.replace(
                        "```",
                        ""
                );


        return result.trim();
    }


    // =====================================================
    // GENERATE ONE QUESTION
    // =====================================================

    public String generateQuestion(
            Long interviewId,
            String category,
            String difficulty) {

        return generateQuestion(
                interviewId,
                "Java",
                category,
                difficulty
        );
    }


    // =====================================================
    // GENERATE ONE QUESTION
    // =====================================================

    public String generateQuestion(
            Long interviewId,
            String programmingLanguage,
            String category,
            String difficulty) {


        // -------------------------------------------------
        // FIND INTERVIEW
        // -------------------------------------------------

        Interview interview =
                interviewRepository
                        .findById(interviewId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Interview not found with ID: "
                                                + interviewId
                                )
                        );


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
        // PROMPT
        // -------------------------------------------------

        String prompt = """
                You are a professional technical interviewer.

                Generate ONE interview question for a fresher.

                Programming Language:
                %s

                Category:
                %s

                Difficulty:
                %s

                IMPORTANT RULES:

                1. Generate exactly ONE question.

                2. The question MUST match the selected
                   programming language.

                3. The question MUST match the selected
                   category.

                4. The question MUST match the selected
                   difficulty.

                5. The question must be suitable for a
                   fresher technical interview.

                6. Do not make an Easy question unnecessarily
                   difficult.

                7. Do not ask advanced questions when the
                   selected category is basic.

                8. Do not mix programming languages.

                9. Do not provide the answer.

                10. Do not provide explanation.

                11. Do not provide hints.

                12. Do not provide a solution.

                13. Do not number the question.

                14. Return ONLY the question text.

                Generate the interview question now.
                """.formatted(
                        programmingLanguage,
                        category,
                        difficulty
                );


        // -------------------------------------------------
        // CALL OLLAMA
        // -------------------------------------------------

        String aiQuestion =
                askAI(prompt);


        // -------------------------------------------------
        // SAVE QUESTION
        // -------------------------------------------------

        Question question =
                new Question();


        question.setQuestion(
                aiQuestion
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


        questionRepository.save(
                question
        );


        return aiQuestion;
    }


    // =====================================================
    // GENERATE MULTIPLE QUESTIONS
    // =====================================================

    public void generateQuestions(
            Long interviewId,
            String programmingLanguage,
            String category,
            String difficulty,
            int numberOfQuestions) {


        // -------------------------------------------------
        // VALIDATE COUNT
        // -------------------------------------------------

        if (numberOfQuestions < 1) {

            throw new IllegalArgumentException(
                    "Number of questions must be at least 1"
            );
        }


        if (numberOfQuestions > 20) {

            throw new IllegalArgumentException(
                    "Maximum 20 questions are allowed"
            );
        }


        // -------------------------------------------------
        // GENERATE QUESTIONS
        // -------------------------------------------------

        for (int i = 0;
             i < numberOfQuestions;
             i++) {


            generateQuestion(
                    interviewId,
                    programmingLanguage,
                    category,
                    difficulty
            );
        }
    }


    // =====================================================
    // EVALUATE CANDIDATE ANSWER
    // =====================================================

    public String evaluateAnswer(
            String question,
            String answer) {


        // -------------------------------------------------
        // VALIDATE ANSWER
        // -------------------------------------------------

        if (question == null ||
                question.isBlank()) {

            throw new IllegalArgumentException(
                    "Question cannot be empty"
            );
        }


        if (answer == null ||
                answer.isBlank()) {

            return """
                    Score: 0/10
                    Feedback: No answer was provided.
                    Strengths: No strengths could be identified.
                    Improvements: Provide an answer to the question.
                    """;
        }


        // -------------------------------------------------
        // EVALUATION PROMPT
        // -------------------------------------------------

        String prompt = """
                You are a professional technical interviewer.

                Evaluate the candidate's answer.

                Question:
                %s

                Candidate Answer:
                %s

                Evaluate the answer based on:

                - Technical correctness
                - Understanding of the concept
                - Relevance
                - Completeness

                Return the evaluation EXACTLY in this format:

                Score: X/10
                Feedback: <brief feedback>
                Strengths: <candidate strengths>
                Improvements: <areas to improve>

                RULES:

                1. Score must be between 0 and 10.

                2. Be fair to a fresher.

                3. Do not give a high score if the answer
                   is technically incorrect.

                4. Do not give a low score merely because
                   the answer is short if it is correct.

                5. Do not add additional sections.

                6. Return ONLY the requested evaluation.
                """.formatted(
                        question,
                        answer
                );


        // -------------------------------------------------
        // CALL OLLAMA
        // -------------------------------------------------

        return askAI(prompt);
    }
}