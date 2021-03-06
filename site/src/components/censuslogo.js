import React from "react"
import { css } from "@emotion/core"
import { spacing } from "../utils/styles"
import VisuallyHidden from "@reach/visually-hidden"

export default () => {
  return (
    <div
      css={css`
        width: 100%;
        max-width: ${spacing.desktop_max_width};
      `}
    >
      <VisuallyHidden>
        <h1>Self Help Facility</h1>
      </VisuallyHidden>
      <img
        src="/census_2021_logo_white.svg"
        alt="Main logo"
        css={css`
          height: 50px;
          padding: 0px 15px 20px 15px;
        `}
        data-test="ons-logo__header"
      />
    </div>
  )
}
