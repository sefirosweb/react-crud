import{j as t}from"./ThemeProvider-09f3a863.js";import{r as l}from"./index-76fb7be0.js";import{M as s}from"./index-560bdad7.js";import{B as n}from"./Button-880d3194.js";import"./_commonjsHelpers-de833af9.js";import"./index-c93e2f2e.js";import"./LoadingButton-41bc35b5.js";import"./LoadingSpinner-7d259415.js";import"./useTranslation-7232bec6.js";import"./i18nInstance-1f8a4d28.js";import"./useEventCallback-c7177fdc.js";import"./index-d3ea75b5.js";import"./inheritsLoose-c82a83d4.js";import"./createWithBsPrefix-2998513f.js";import"./index-8d47fad6.js";import"./index-64b682ff.js";import"./index-2ce11de6.js";import"./matchStrings-5a558dd8.js";import"./i18n-9fd04d21.js";import"./axios-503983f7.js";import"./index-1716dfda.js";import"./Form-c707cc1e.js";import"./FormTypeDate-430a9028.js";import"./FormTypeHtml-e189c7f9.js";import"./FormTypeNumber-bca85b35.js";import"./FormTypePassword-157ba307.js";import"./FormTypeSelect-3634e20f.js";import"./useGetQueryClient-5c6c423d.js";import"./FormTypeText-940786e9.js";import"./FormTypeTextArea-c7676ee8.js";import"./Row-5355c8a4.js";import"./Button-ad68e730.js";import"./index-21433751.js";import"./index-862e6100.js";import"./index.esm-a45aa266.js";const Q={title:"Form/MultiSelectCrud",component:s},u=[{accessorKey:"uuid",enableHiding:!0},{accessorKey:"name"},{accessorKey:"category"}],r={args:{primaryKey:"uuid",primaryKeyId:"1",crudUrl:"/api/sub_table",getDataUrl:"/api/get_options",title:"Title for CRUD",columns:u},render:p=>{const[a,o]=l.useState(!1);return t.jsxs(t.Fragment,{children:[t.jsx(n,{variant:"info",onClick:()=>{o(!0)},children:"Open multi select modal"}),t.jsx(s,{...p,show:a,setShow:o})]})}};var e,i,m;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    primaryKey: 'uuid',
    primaryKeyId: '1',
    crudUrl: '/api/sub_table',
    getDataUrl: '/api/get_options',
    title: 'Title for CRUD',
    columns: TestColumnsModel
  },
  render: props => {
    const [show, setShow] = useState(false);
    return <>
        <Button variant="info" onClick={() => {
        setShow(true);
      }}>
          Open multi select modal
        </Button>

        <MultiSelectCrud {...props} show={show} setShow={setShow} />
      </>;
  }
}`,...(m=(i=r.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const V=["Template"];export{r as Template,V as __namedExportsOrder,Q as default};
//# sourceMappingURL=MultiSelectCrud.stories-b3a42a57.js.map
