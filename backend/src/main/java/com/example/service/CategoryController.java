package com.example.service;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Value("${API_KEY}") // Load API key from environment variables or application.properties
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String API_URL = "https://generative-ai.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

    @PostMapping("/category")
    public ResponseEntity<String> generateQuestions(@RequestBody CategoryRequest request) {
        String prompt = String.format(
                "You are an assistant helping users decide whether to explore or exploit an option in the category: %s.\n"
                        + "Generate four relevant questions to assess their past choices (T), satisfaction, risk tolerance (k), and current mood.",
                request.getCategory());

        String payload = "{\"prompt\":\"" + prompt + "\",\"generationConfig\":{\"responseMimeType\":\"application/json\"}}";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ResponseEntity<String> response = restTemplate.exchange(
                API_URL + "?key=" + apiKey,
                HttpMethod.POST,
                new HttpEntity<>(payload, headers),
                String.class);

        return ResponseEntity.ok(response.getBody());
    }
}

