import { it, expect, describe } from "vitest";
import { convert } from "../libs/fx";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import App from "../src/App";

describe("UI Test", () => {
    render(<App />);
    
    it("render correctly", () => {
		expect(screen.getByRole("title")).toBeInTheDocument();
	});

	it("should show correct result", async () => {
		await fireEvent.change(screen.getByRole("input"), {
			target: { value: "1" },
		});
		await fireEvent.click(screen.getByRole("button"));
		expect(screen.getByRole("result").textContent).toBe("4450");
	});
});

it("should be 4450", () => {
	expect(convert(1)).toBe(4450);
});
