import { css } from "@emotion/react";

export const borderButtonStyle = css`
  color: var(--color-text);
  background-color: var(--color-bg);
  font-size: 15px;
  font-weight: medium;
  text-align: center;
  border-radius: 10px;
  border: 2px solid var(--color-border);
  &:active {
    color: var(--color-text50);
  }
  transition: all 0.2s;
`