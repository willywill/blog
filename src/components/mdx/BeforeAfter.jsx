import React, { useId, useState } from 'react';

export default function BeforeAfter({
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeSrc,
  afterSrc,
  alt,
  initialPosition = 52,
}) {
  const [position, setPosition] = useState(initialPosition);
  const inputId = useId();

  return (
    <figure className="before-after">
      <div className="before-after__slider" style={{ '--before-after-position': `${position}%` }}>
        <div className="before-after__frame">
          <img
            className="before-after__image"
            src={beforeSrc.src ?? beforeSrc}
            alt={alt}
            loading="lazy"
          />
          <div className="before-after__after">
            <img
              className="before-after__image"
              src={afterSrc.src ?? afterSrc}
              alt={alt}
              loading="lazy"
            />
          </div>

          <span className="before-after__label before-after__label--before">{beforeLabel}</span>
          <span className="before-after__label before-after__label--after">{afterLabel}</span>

          <div className="before-after__divider" aria-hidden="true">
            <span className="before-after__handle"></span>
          </div>
        </div>

        <label className="before-after__sr-only" htmlFor={inputId}>
          Adjust before and after comparison
        </label>
        <input
          id={inputId}
          className="before-after__range"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </div>
    </figure>
  );
}
