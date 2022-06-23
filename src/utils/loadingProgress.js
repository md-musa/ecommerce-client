import ProgressBar from '@badrap/bar-of-progress';

const progress = new ProgressBar({
  size: 4,
  color: '#f95a59',
  className: 'z-100',
  delay: 70,
});

const indicateLoadingProgress = condition => {
  if (condition) progress.start();
  else progress.finish();
};

export default indicateLoadingProgress;
