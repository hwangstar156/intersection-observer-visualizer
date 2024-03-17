import { Button } from '../../common/button';
import { theme } from '../../styles/theme';

export function ApplyButton() {
  return (
    <Button backgroundColor={theme.colors.primary} borderRadius={6} height={40} type="submit">
      Apply
    </Button>
  );
}
