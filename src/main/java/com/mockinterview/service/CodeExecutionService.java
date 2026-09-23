package com.mockinterview.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.stereotype.Service;

import com.mockinterview.dto.CodeRunRequest;
import com.mockinterview.dto.CodeRunResponse;

@Service
public class CodeExecutionService {

    public CodeRunResponse runCode(
            CodeRunRequest request) {

        long startTime =
                System.currentTimeMillis();

        if (request == null) {

            return new CodeRunResponse(
                    false,
                    "",
                    "Request cannot be empty.",
                    0
            );
        }

        if (request.getCode() == null ||
                request.getCode().trim().isEmpty()) {

            return new CodeRunResponse(
                    false,
                    "",
                    "Code cannot be empty.",
                    0
            );
        }

        String language =
                request.getLanguage();

        if (language == null ||
                !language.equalsIgnoreCase("java")) {

            return new CodeRunResponse(
                    false,
                    "",
                    "Currently only Java execution is supported.",
                    0
            );
        }

        Path temporaryDirectory = null;

        try {

            /*
             * Create temporary directory
             */

            temporaryDirectory =
                    Files.createTempDirectory(
                            "ai-mock-code-"
                    );


            /*
             * Java source file
             */

            Path javaFile =
                    temporaryDirectory
                            .resolve("Main.java");


            Files.writeString(
                    javaFile,
                    request.getCode(),
                    StandardCharsets.UTF_8
            );


            /*
             * Compile Java program
             */

            ProcessBuilder compileBuilder =
                    new ProcessBuilder(
                            "javac",
                            javaFile.toString()
                    );

            compileBuilder
                    .directory(
                            temporaryDirectory
                                    .toFile()
                    );

            compileBuilder
                    .redirectErrorStream(true);


            Process compileProcess =
                    compileBuilder.start();


            String compileOutput =
                    readProcessOutput(
                            compileProcess
                    );


            int compileExitCode =
                    compileProcess.waitFor();


            /*
             * Compilation failed
             */

            if (compileExitCode != 0) {

                long executionTime =
                        System.currentTimeMillis()
                                - startTime;

                return new CodeRunResponse(
                        false,
                        "",
                        compileOutput,
                        executionTime
                );
            }


            /*
             * Run Java program
             */

            ProcessBuilder runBuilder =
                    new ProcessBuilder(
                            "java",
                            "-cp",
                            temporaryDirectory
                                    .toString(),
                            "Main"
                    );

            runBuilder
                    .directory(
                            temporaryDirectory
                                    .toFile()
                    );

            runBuilder
                    .redirectErrorStream(true);


            Process runProcess =
                    runBuilder.start();


            /*
             * Wait maximum 5 seconds
             *
             * This prevents a simple infinite
             * loop from running forever.
             */

            boolean finished =
                    runProcess.waitFor(
                            5,
                            java.util.concurrent.TimeUnit.SECONDS
                    );


            if (!finished) {

                runProcess.destroyForcibly();

                long executionTime =
                        System.currentTimeMillis()
                                - startTime;

                return new CodeRunResponse(
                        false,
                        "",
                        "Execution timed out. Maximum execution time is 5 seconds.",
                        executionTime
                );
            }


            String output =
                    readProcessOutput(
                            runProcess
                    );


            int exitCode =
                    runProcess.exitValue();


            long executionTime =
                    System.currentTimeMillis()
                            - startTime;


            if (exitCode != 0) {

                return new CodeRunResponse(
                        false,
                        "",
                        output,
                        executionTime
                );
            }


            return new CodeRunResponse(
                    true,
                    output,
                    "",
                    executionTime
            );


        } catch (Exception e) {

            long executionTime =
                    System.currentTimeMillis()
                            - startTime;

            return new CodeRunResponse(
                    false,
                    "",
                    e.getMessage(),
                    executionTime
            );


        } finally {

            /*
             * Delete temporary files
             */

            if (temporaryDirectory != null) {

                deleteDirectory(
                        temporaryDirectory
                );
            }
        }
    }


    private String readProcessOutput(
            Process process)
            throws Exception {

        StringBuilder output =
                new StringBuilder();


        BufferedReader reader =
                new BufferedReader(
                        new InputStreamReader(
                                process.getInputStream(),
                                StandardCharsets.UTF_8
                        )
                );


        String line;


        while ((line = reader.readLine())
                != null) {

            output.append(line);

            output.append(
                    System.lineSeparator()
            );
        }


        return output.toString();
    }


    private void deleteDirectory(
            Path directory) {

        try {

            if (Files.exists(directory)) {

                Files.walk(directory)
                        .sorted(
                                java.util.Comparator
                                        .reverseOrder()
                        )
                        .map(Path::toFile)
                        .forEach(File::delete);
            }

        } catch (Exception e) {

            System.out.println(
                    "Unable to delete temporary files: "
                            + e.getMessage()
            );
        }
    }
}