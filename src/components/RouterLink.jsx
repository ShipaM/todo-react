const RouterLink = ({ to, children, ...restProps }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, "", to);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  return (
    <a href={to} {...restProps} onClick={handleClick}>
      {children}
    </a>
  );
};

export default RouterLink;
