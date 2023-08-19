import{j as o}from"./ThemeProvider-a71a5aa9.js";import{r as c}from"./index-61bf1805.js";import{M as a}from"./index-086f44c1.js";import{B as m}from"./Button-97fb7a83.js";import"./_commonjsHelpers-de833af9.js";import"./LoadingButton-5a00958f.js";import"./LoadingSpinner-ee85fb67.js";import"./useTranslation-9aad8729.js";import"./i18nInstance-1f8a4d28.js";import"./useEventCallback-2ca67dcc.js";import"./index-2801d3c9.js";import"./inheritsLoose-c82a83d4.js";import"./createWithBsPrefix-e4b19ea9.js";import"./index-8d47fad6.js";import"./Button-aac535fb.js";const y={title:"Form/Modal",component:a},t={args:{accept:"Accept button",title:"Title of modal",body:"Body of modal",handleAccept:()=>{console.log("handleAccept")},onExited:()=>{console.log("onExited")},onShow:()=>{console.log("onShow")}},render:l=>{const[p,e]=c.useState(!1);return o.jsxs(o.Fragment,{children:[o.jsx(m,{onClick:()=>{e(!0)},children:"Open Modal"}),o.jsx(a,{...l,show:p,setShow:e})]})}};var n,r,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    accept: 'Accept button',
    title: 'Title of modal',
    body: 'Body of modal',
    handleAccept: () => {
      console.log('handleAccept');
    },
    onExited: () => {
      console.log('onExited');
    },
    onShow: () => {
      console.log('onShow');
    }
  },
  render: props => {
    const [show, setShow] = useState(false);
    return <>
        <Button onClick={() => {
        setShow(true);
      }}>
          Open Modal
        </Button>

        <Modal {...props} show={show} setShow={setShow} />
      </>;
  }
}`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const T=["Template"];export{t as Template,T as __namedExportsOrder,y as default};
//# sourceMappingURL=Modal.stories-97afea61.js.map
