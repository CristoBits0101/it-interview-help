import { $ } from './dom';
import { translate, type Language } from './i18n';
interface ReviewOptions {
  cards: HTMLElement[]; learned: Set<string>; getLanguage: () => Language;
  onChange: () => void; onNotice: (message: string) => void; trigger: HTMLButtonElement | null;
}
export function initializeReview({ cards, learned, getLanguage, onChange, onNotice, trigger }: ReviewOptions) {
const reviewDialog = $<HTMLDialogElement>('#review-dialog');
let reviewCards: HTMLElement[] = [];
let reviewIndex = 0;
let reviewUnderstood = 0;
function drawReview() {
  const card = reviewCards[reviewIndex];
  $('#review-position').textContent = `${reviewIndex + 1} / ${reviewCards.length}`;
  const cardTitle = card.querySelector('h3')!;
  const reviewTitle = $('#review-title');
  reviewTitle.textContent = cardTitle.textContent;
  reviewTitle.lang = cardTitle.lang || getLanguage();
  reviewTitle.translate = cardTitle.translate;
  if (cardTitle.dataset.patternTitle) reviewTitle.dataset.patternTitle = cardTitle.dataset.patternTitle;
  else delete reviewTitle.dataset.patternTitle;
  $('#review-definition').replaceChildren(...Array.from(card.querySelector('[data-card-panel="explanation"]')!.children, child => child.cloneNode(true)));
  $('#review-source').replaceChildren(card.querySelector('.concept-source')!.cloneNode(true));
  $('#review-category').textContent = translate(card.closest<HTMLElement>('.concept-section')!.dataset.trackEyebrow!, getLanguage());
  $('#review-answer').hidden = true;
  $('#reveal-answer').hidden = false;
  $('#review-rating').hidden = true;
  $('#review-complete').hidden = true;
  $('#review-question').hidden = false;
  reviewDialog.setAttribute('aria-labelledby', 'review-title');
  $('#review-helper').hidden = false;
  $('#reveal-answer').focus();
}
function startReview() {
  const available = cards.filter(card => !card.hidden && !card.closest<HTMLElement>('.concept-section')!.hidden);
  if (!available.length) { onNotice(translate('Elige primero algún concepto para repasar.', getLanguage())); return; }
  // Prioritize pending concepts; shuffle within each group for varied practice.
  const shuffle = (list: HTMLElement[]) => {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
    return copy;
  };
  reviewCards = [...shuffle(available.filter(card => !learned.has(card.dataset.conceptId!))), ...shuffle(available.filter(card => learned.has(card.dataset.conceptId!)))];
  reviewIndex = 0; reviewUnderstood = 0;
  reviewDialog.showModal(); drawReview();
}
trigger?.addEventListener('click', () => startReview());
$('#reveal-answer').addEventListener('click', () => { $('#review-answer').hidden = false; $('#reveal-answer').hidden = true; $('#review-rating').hidden = false; $('#review-again').focus(); });
function nextReview(understood: boolean) {
  const id = reviewCards[reviewIndex].dataset.conceptId!;
  if (understood) { learned.add(id); reviewUnderstood++; }
  else learned.delete(id);
  onChange();
  reviewIndex++;
  if (reviewIndex < reviewCards.length) drawReview();
  else {
    $('#review-question').hidden = true; $('#review-rating').hidden = true; $('#review-helper').hidden = true;
    $('#review-complete').hidden = false;
    $('#review-summary').textContent = getLanguage() === 'en'
      ? `Concepts reviewed: ${reviewCards.length}. Understood: ${reviewUnderstood}. Keep practicing: ${reviewCards.length - reviewUnderstood}.`
      : `Conceptos repasados: ${reviewCards.length}. Comprendidos: ${reviewUnderstood}. Para seguir practicando: ${reviewCards.length - reviewUnderstood}.`;
    reviewDialog.setAttribute('aria-labelledby', 'review-complete-title');
    $('#review-complete button').focus();
  }
}
$('#review-known').addEventListener('click', () => nextReview(true));
$('#review-again').addEventListener('click', () => nextReview(false));

}
