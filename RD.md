 SEO 
website – For general web pages (homepages, landing pages).
article – For blog posts, news articles, and content-focused pages.
event – Specifically for event-related pages (best suited for event details).
product – For e-commerce product pages.
profile – For user profile pages.
video.movie – For pages featuring movies or videos.








. Install Dependencies
Jest and React Testing Library are often included in React projects (especially if you used Create React App), but if they are missing, install them using:

sh
Copy
Edit
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
If your project is using TypeScript, install the types:

sh
Copy
Edit
npm install --save-dev @types/jest
2. Configure Jest (Optional)
Jest should work out of the box, but if needed, create a Jest config file:

For JavaScript projects:
Add this to your package.json:

json
Copy
Edit
"jest": {
  "testEnvironment": "jsdom"
}
For TypeScript projects:
Create a jest.config.js file in the root folder:

js
Copy
Edit
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy" // Mock styles
  }
};
3. Create a __tests__ Folder
Inside your src folder, create a folder named __tests__. This is where you'll place your test files.

Your project structure should look like this:

lua
Copy
Edit
src/
  components/
    Home.tsx
  __tests__/
    Home.test.tsx  <-- Place your test file here
4. Add the Test File
Now, in the __tests__ folder, create a file called Home.test.tsx and paste the test code inside it.

5. Run the Tests
To run tests, use:

sh
Copy
Edit
npm test
This will start Jest in watch mode, running tests automatically when you save changes.

6. Understanding the Test File
render(<Home />): Renders the component inside a virtual DOM.
screen.getByText(): Finds text on the page.
fireEvent.click(button): Simulates a user clicking a button.
expect(navigate).toHaveBeenCalledWith(...): Ensures navigation works.




import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home"; // Adjust the import based on your file structure
import { useIconColor } from "../hooks/useIconColor";
import { useNavigate } from "react-router-dom";

// Mock hooks
jest.mock("../hooks/useIconColor", () => ({
  useIconColor: jest.fn(() => ({ bgGradient: "bg-gradient", bgColor: "bg-color" }))
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn()
}));

describe("Home Page", () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  test("renders Home component correctly", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
  });

  test("clicking Get Started button calls scrollToTeamBonding", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /get started/i });
    fireEvent.click(button);
    // Not testing scroll behavior, but ensure button exists and is clickable
  });

  test("handleNavigation navigates correctly", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const adminButton = screen.getByText("Corporate Admin");
    fireEvent.click(adminButton);

    expect(navigate).toHaveBeenCalledWith("/sign-up?role=admin");
  });
});





