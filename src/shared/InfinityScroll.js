import React, { useCallback, useEffect } from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
  const { children, nextCall, is_next, is_loading } = props;
  const _throttle = _.throttle(() => {
    if (is_loading) {
      return;
    }
    const { scrollHeight } = document.body;
    const { innerHeight } = window;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      nextCall();
    }
  }, 300);
  const throttleCallback = useCallback(_throttle, [is_loading]);

  useEffect(() => {
    if (is_loading) {
      return;
    }
    if (is_next) {
      window.addEventListener("scroll", throttleCallback);
    } else {
      window.removeEventListener("scroll", throttleCallback);
    }

    return () => window.removeEventListener("scroll", throttleCallback);
  }, [is_next, is_loading]);

  return <>{children}</>;
};

InfinityScroll.defaultProps = {
  children: null,
  nextCall: () => {},
  is_next: false,
  is_loading: false,
};

export default InfinityScroll;
