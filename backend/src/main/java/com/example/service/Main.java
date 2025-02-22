package com.example.service;

public class Main {
    private String category;
    private String location;
    private int satisfactionScore;
    
    public Main(String category, String location, int satisfactionScore) {
        this.category = category;
        this.location = location;
        this.satisfactionScore = satisfactionScore;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getSatisfactionScore() {
        return satisfactionScore;
    }

    public void setSatisfactionScore(int satisfactionScore) {
        this.satisfactionScore = satisfactionScore;
    }

    @Override
    public String toString() {
        return "Extract data from Google for " + category + " in " + location +
               " with a Google Maps rating of " + satisfactionScore + " or higher. " +
               "Return the results as a JSON list containing each " + category +
               "'s name, address, and rating.";
    }
}
