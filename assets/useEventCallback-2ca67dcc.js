import{r as e}from"./index-61bf1805.js";function u(t){const r=e.useRef(t);return e.useEffect(()=>{r.current=t},[t]),r}function f(t){const r=u(t);return e.useCallback(function(...n){return r.current&&r.current(...n)},[r])}export{f as u};
//# sourceMappingURL=useEventCallback-2ca67dcc.js.map
