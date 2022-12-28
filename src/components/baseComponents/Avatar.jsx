/**
 * @param src
 * @param alt
 * @param size {'small', 'medium', 'huge'}
 * @param className
 * @param round
 * @param mr
 * @param ml
 * @param mt
 * @param mb
 * @returns {JSX.Element}
 * @constructor
 */
function Avatar ({
                   src,
                   alt = 'avatar',
                   size = 'medium',
                   className = '',
                   round = false,
                   mr = 0,
                   ml = 0,
                   mt = 0,
                   mb = 0,
                 }) {
  return <img
    className={`${round ? 'round-' : ''}avatar-${size} ${className}`}
    style={{ marginBottom: mb, marginTop: mt, marginLeft: ml, marginRight: mr }}
    src={src}
    alt={alt}
  />;
}

export default Avatar;