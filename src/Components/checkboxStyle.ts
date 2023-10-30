import { SerializedStyles, css } from "@emotion/react";

export const checkboxStyle: SerializedStyles = css`
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 25%;
  background-color: var(--color-bg-input);

  &:hover {
    border: 1.5px solid var(--color-accent);
    outline: 4px solid var(--color-accent20);
    background-color: var(--color-bg-input);
  }
  
  &:checked {
    width: 24px;
    height: 24px;
    border-radius: 25%;
    background-color: var(--color-accent);
    border: 5px solid var(--color-bg-input);
    outline: 1.5px solid var(--color-accent);
  }

  transition: all 0.25s;
`