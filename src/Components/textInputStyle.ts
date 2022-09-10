import { css } from "@emotion/react";

export const textInputStyle = css`
  border-radius: 10px;
  font-size: 15px;
  text-align: center;
  color: var(--color-text);
  background: var(--color-bg-input);
  outline: none;
  border: 0px;
  ::placeholder {
    color: var(--color-text-input-placeholder);
  }
  &:focus-visible {
    border: 1px solid var(--color-accent);
    outline: 4px solid var(--color-accent20);
  }
  transition: all 0.2s;
`