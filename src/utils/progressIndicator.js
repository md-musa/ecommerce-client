import useProgress from '../hooks/useProgress';

const progress = useProgress();

const progressIndicator = condition => {
  if (condition) progress.start();
  else progress.finish();
};

export default progressIndicator;
