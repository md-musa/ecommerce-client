import ProgressBar from '@badrap/bar-of-progress';

const progress = new ProgressBar({
  size: 4,
  color: '#f95a59',
  className: 'z-100',
  delay: 70,
});
function useProgress() {
  return progress;
}

export default useProgress;
