// ========================================================

const viewport_geometry = () => {
  const viewport_width = window.innerWidth;
  const viewport_height = window.innerHeight;
  const viewport_center_x = viewport_width / 2;
  const viewport_center_y = viewport_height / 2;

  return {
    viewport_center_x,
    viewport_center_y,
    viewport_width,
    viewport_height,
  };
};

// ========================================================

const element_geometry = (elem) => {
  const square_geometry = elem.getBoundingClientRect();

  const w = square_geometry.width;
  const h = square_geometry.height;
  const x1 = square_geometry.left;
  const y1 = square_geometry.top;
  const x0 = x1 + w / 2;
  const y0 = y1 + h / 2;

  return { x0, y0, x1, y1, w, h };
};

// ========================================================

const get_center_shifts = (viewport_center_x, viewport_center_y, x0, y0) => {
  let shift_x, shift_y;

  if (viewport_center_x > x0) shift_x = viewport_center_x - x0;
  else shift_x = -(x0 - viewport_center_x);

  if (viewport_center_y > y0) shift_y = viewport_center_y - y0;
  else shift_y = -(y0 - viewport_center_y);

  return { shift_x, shift_y };
};

// ========================================================

export { viewport_geometry, element_geometry, get_center_shifts };

// ========================================================
