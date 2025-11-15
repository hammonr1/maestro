# 🍳 **Chef Al Aire (The Free Chef) **

### *A multimodal, hands-free cooking companion powered by voice, gestures, and AI.*

Chef Al Aire is a next-generation cooking assistant that lets you
search, browse, and navigate recipes **completely hands-free** using
**voice commands**, **hand-gesture controls**, and a clean, responsive
React UI. Whether you're cooking with messy hands or just want a more
intuitive kitchen workflow, Chef Al Aire helps you stay focused on the
recipe---not the screen.

------------------------------------------------------------------------

## 🚀 What It Does

Chef Al Aire combines **three modalities** to create a seamless cooking
experience:

-   🎤 **Voice Search & Commands**\
    Search for recipes by speaking naturally ("chocolate chip cookies,"
    "vegetarian pasta").\
    Navigate steps using hands-free commands like *next*, *back*,
    *scroll*, or *show all*.

-   ✋ **MediaPipe Hand Tracking**\
    Use simple pinch gestures to trigger actions, click UI elements, or
    activate search mode.

-   🍲 **Live Recipe Data via Spoonacular API**\
    Fetch real recipes, ingredients, instructions, and images with
    caching and error handling built in.

------------------------------------------------------------------------

## 🧠 Built Using Goose's Multi-Agent System

Instead of relying on one giant prompt, this project was built using
**Goose**, which let me work with a coordinated team of **seven AI
subagents**, each specializing in a different engineering domain. I
collaborated with a "PM Agent" to define the vision, architecture, and a
nine-phase roadmap. Each phase clearly defined which subagents to use
and what files or functionality they should deliver.

### 🧩 The 7 Subagents

-   **Voice Specialist** -- Web Speech API, command parsing, continuous
    listening\
-   **MediaPipe Specialist** -- Hand tracking + gesture logic\
-   **React UI Architect** -- All .tsx components and screens\
-   **State Management Engineer** -- Hooks, models, caching layers\
-   **API Integration Specialist** -- Spoonacular endpoints + data
    transformation\
-   **Integration Orchestrator** -- Connected all feature modules across
    phases\
-   **Testing & Polish Specialist** -- Debugging, validation,
    performance tweaks

Goose automatically executed many of these subagents *in parallel*,
aggregated their outputs, and ensured consistency across the entire
codebase. If something broke, I simply described the issue to the PM
agent, which generated a new subagent plan to fix it---no manual
context-passing required. This workflow felt like managing a real
engineering team and dramatically accelerated development.

------------------------------------------------------------------------

## 🏗️ How It Works (High-Level Architecture)

Chef Al Aire combines several services into a unified, hands-free
experience:

-   **Voice Pipeline:**
    -   Continuous speech recognition\
    -   Command mode\
    -   Search mode\
    -   Event callbacks into the UI
-   **Gesture Pipeline:**
    -   MediaPipe Hands model\
    -   Pinch detection\
    -   Cursor-based UI interactions
-   **Recipe Engine (Spoonacular):**
    -   Live recipe search\
    -   Detailed recipe info\
    -   Local caching
-   **React UI:**
    -   Home page grid\
    -   Recipe detail view\
    -   Ingredient lists\
    -   Step navigation\
    -   Saved recipes panel

------------------------------------------------------------------------

## 🧪 How to Use Chef Al Aire

-   **Search:**
    -   Say *"search for pasta"* or pinch the search bar.
-   **Navigate Recipes:**
    -   Say *"next step"*, *"back"*, *"scroll"*, or *"show all"*.
-   **View Details:**
    -   Tap or pinch a recipe card to load details.

------------------------------------------------------------------------

## 🛠️ Running the Project Locally

    npm install
    cp .env.example .env   # add your Spoonacular API key
    npm run dev

------------------------------------------------------------------------

## 📁 Project Structure

    /src
      /services
      /components
      /pages
      /types
      /hooks
      /utils
      App.tsx

------------------------------------------------------------------------

## 🏅 Why This Project Matters

Chef Al Aire demonstrates how multimodal interaction---voice, gestures,
and AI---can redefine cooking workflows. It showcases real-time media
processing, API integration, and AI-assisted navigation inside a unified
React application. And thanks to Goose's multi-agent workflow, the
entire system was developed with clarity, consistency, and parallelized
speed that traditional prompting can't match.
