import { css } from "@emotion/react";

export const accentButtonStyle = css`
  color: var(--color-text);
  background: linear-gradient(150deg, rgba(252,40,73,1) 0%, rgba(252,116,40,1) 100%);
  font-size: 15px;
  font-weight: medium;
  text-align: center;
  border-radius: 10px;
  border: none;
  &:active {
    color: var(--color-text50);
  }
  transition: all 0.2s;
`