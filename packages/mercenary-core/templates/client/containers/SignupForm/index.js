import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create } from '../../store/userAccount/actions';
import SignupForm from '../../components/SignupForm';

// Map application state to component props
function mapStateToProps(state) {
  return {
    token: state.session.token,
    error: state.session._error,
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signup: create }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupForm);