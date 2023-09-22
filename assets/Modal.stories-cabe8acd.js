import{j as o}from"./ThemeProvider-09f3a863.js";import{r as c}from"./index-76fb7be0.js";import{M as a}from"./index-c93e2f2e.js";import{B as m}from"./Button-880d3194.js";import"./_commonjsHelpers-de833af9.js";import"./LoadingButton-41bc35b5.js";import"./LoadingSpinner-7d259415.js";import"./useTranslation-7232bec6.js";import"./i18nInstance-1f8a4d28.js";import"./useEventCallback-c7177fdc.js";import"./index-d3ea75b5.js";import"./inheritsLoose-c82a83d4.js";import"./createWithBsPrefix-2998513f.js";import"./index-8d47fad6.js";import"./Button-ad68e730.js";const y={title:"Form/Modal",component:a},t={args:{accept:"Accept button",title:"Title of modal",body:"Body of modal",handleAccept:()=>{console.log("handleAccept")},onExited:()=>{console.log("onExited")},onShow:()=>{console.log("onShow")}},render:l=>{const[p,e]=c.useState(!1);return o.jsxs(o.Fragment,{children:[o.jsx(m,{onClick:()=>{e(!0)},children:"Open Modal"}),o.jsx(a,{...l,show:p,setShow:e})]})}};var n,r,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
//# sourceMappingURL=Modal.stories-cabe8acd.js.map