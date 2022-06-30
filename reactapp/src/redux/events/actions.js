const actions = {
  NEXT_STEP: 'NEXT_STEP',
  
  nextStep: data => {
    return {
      type: actions.NEXT_STEP,
      data,
    };
  },

  
};

export default actions;
