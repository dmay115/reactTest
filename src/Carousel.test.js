import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
it("renders without crashing", function () {
    render(<Carousel photos={TEST_IMAGES} />);
});

// snapshot test
it("matches snapshot", function () {
    const { asFragment } = render(<Carousel photos={TEST_IMAGES} />);
    expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
    const { container } = render(
        <Carousel photos={TEST_IMAGES} title="images for testing" />
    );
    // expect the first image to show, but not the second
    expect(
        container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
        container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
        container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
        container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
    const { container } = render(
        <Carousel photos={TEST_IMAGES} title="images for testing" />
    );

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);
    // move back in the carousel
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow);

    // expect the second image to show, but not the first
    expect(
        container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();
    expect(
        container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
});

it("doesn't show left arrow when on first image", function () {
    const { container } = render(
        <Carousel photos={TEST_IMAGES} title="images for testing" />
    );
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    expect(leftArrow).not.toBeInTheDocument();
});

it("doesn't show right arrow when on last image", function () {
    const { container } = render(
        <Carousel photos={TEST_IMAGES} title="images for testing" />
    );
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);
    expect(rightArrow).not.toBeInTheDocument();
});
