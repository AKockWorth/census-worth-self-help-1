import React from "react"
import renderer from "react-test-renderer"
import { render, fireEvent } from "react-testing-library"

import FeedbackScreen from "../feedbackscreen"


describe("Feedback Screen", () => {

  let hideFunction = jest.fn()
  let submitFunction = jest.fn()

  it("renders correctly", () => {
    const tree = renderer
      .create(<FeedbackScreen 
        hideFunction={hideFunction}
        submitFunction={submitFunction}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("click functions call correctly", () => {

  	const { getByTestId } = render(<FeedbackScreen 
        hideFunction={hideFunction}
        submitFunction={submitFunction}
      />);
  	
    const hideButton = getByTestId('feedback-screen-cancel-button')

  	fireEvent.click(hideButton);

  	expect(hideFunction).toHaveBeenCalledTimes(1)

    const submitButton = getByTestId('feedback-screen-submit-button')

    fireEvent.click(submitButton);

    expect(submitFunction).toHaveBeenCalledTimes(1)
  })

  it("displays positive message if boolean passed in", () => {
      const { getByText } = render(<FeedbackScreen 
        hideFunction={hideFunction}
        submitFunction={submitFunction}
        feedbackIsPositive={true}
      />);
      expect(getByText('Please tell us what you liked')).toBeDefined()
  })


    it("doesn't display positive message if set to negative", () => {
        const { queryByText } = render(<FeedbackScreen
            hideFunction={hideFunction}
            submitFunction={submitFunction}
            feedbackIsPositive={false}
        />);

        expect(queryByText('Please tell us what you liked')).toBeNull()
    })
})