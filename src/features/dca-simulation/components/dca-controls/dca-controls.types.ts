import type { DCAConfig } from "../../types/domain.types";

export type DCAControlsProps = {
  onSubmit: (config: DCAConfig) => void;
};