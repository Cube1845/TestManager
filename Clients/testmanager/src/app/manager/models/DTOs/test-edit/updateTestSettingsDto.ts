import { TestSettings } from '../../types/testSettings';

export type UpdateTestSettingsDTO = {
  name: string;
  settings: TestSettings;
};
