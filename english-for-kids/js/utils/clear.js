export default function create(target) {
  while (target.children.length) {
    target.removeChild(target.lastChild);
  }
}
