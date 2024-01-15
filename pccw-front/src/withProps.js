import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const EMPTY_OBJ = {};

const separatePropCreators = (propsCreators = EMPTY_OBJ) =>
  Object.entries(propsCreators).reduce(
    (creators, [key, creator]) =>
      creator.type || creator.get
        ? {
            ...creators,
            actionPropsCreators: {
              ...creators.actionPropsCreators,
              [key]: creator
            }
          }
        : {
            ...creators,
            statePropsCreators: {
              ...creators.statePropsCreators,
              [key]: creator
            }
          },
    {
      statePropsCreators: EMPTY_OBJ,
      actionPropsCreators: EMPTY_OBJ
    }
  );

const mapDispatchToProps = (selectors) => (dispatch) => {
  return !selectors
    ? {}
    : Object.fromEntries(
        Object.entries(selectors).map(([key, action]) => {
          return [key, (payload) => dispatch(action(payload))];
        })
      );
};

const mapStateToProps = (selectors) => {
  return typeof selectors === 'function'
    ? selectors
    : createStructuredSelector(selectors);
};

function withProps(propSelectors) {
  const { statePropsCreators, actionPropsCreators } =
    separatePropCreators(propSelectors);
  const actionsProps = mapDispatchToProps(actionPropsCreators);
  const stateProps = mapStateToProps(statePropsCreators);
  return connect(stateProps, actionsProps);
}

export default withProps;
