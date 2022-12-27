const className = 'rating-label';

export default function RatingLabel ({ value, fw = 'bold', fs = 15 }) {
  let className = value >= 0 ? 'positive' : 'negative';
  let signedValue = value > 0 ? '+' + value : value;

  return <div className="rating-label-container" style={{ fontSize: fs, fontWeight: fw }}>
    <label className={ className }>
      { signedValue }
    </label>
  </div>;
}