import jss from '../../utils/jss';
import { appNavWidth } from '../../constants/styles';

const contentSidePadding = 20;

const styles = {
  content: {
    position: 'fixed',
    top: 0,
    paddingTop: 10,
    paddingRight: contentSidePadding,
    paddingBottom: 50,
    paddingLeft: appNavWidth + contentSidePadding,
    width: '100%',
    height: '100vh',
    overflow: 'auto',
  },
};

export default jss.createStyleSheet(styles).attach().classes;
