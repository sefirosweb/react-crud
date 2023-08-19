import{j as t}from"./ThemeProvider-a71a5aa9.js";import{r as l}from"./index-61bf1805.js";import{M as m}from"./index-b8849b91.js";import{B as n}from"./Button-97fb7a83.js";import"./_commonjsHelpers-de833af9.js";import"./index-086f44c1.js";import"./LoadingButton-5a00958f.js";import"./LoadingSpinner-ee85fb67.js";import"./useTranslation-9aad8729.js";import"./i18nInstance-1f8a4d28.js";import"./useEventCallback-2ca67dcc.js";import"./index-2801d3c9.js";import"./inheritsLoose-c82a83d4.js";import"./createWithBsPrefix-e4b19ea9.js";import"./index-8d47fad6.js";import"./index-ae92ecc3.js";import"./index-46c535a1.js";import"./matchStrings-5a558dd8.js";import"./i18n-28032080.js";import"./axios-94372f69.js";import"./index-11f483a8.js";import"./FormTypeSelect-a02290b5.js";import"./useGetQueryClient-cbcca069.js";import"./Form-6057eae6.js";import"./Row-b5cb55df.js";import"./Button-aac535fb.js";import"./index-19ed8ea2.js";import"./index-5be08948.js";import"./index.esm-1806526e.js";const A={title:"Form/MultiSelectCrud",component:m},u=[{accessorKey:"uuid",enableHiding:!0},{accessorKey:"name"},{accessorKey:"category"}],r={args:{primaryKey:"uuid",primaryKeyId:"1",crudUrl:"/api/sub_table",getDataUrl:"/api/get_options",title:"Title for CRUD",columns:u},render:p=>{const[a,o]=l.useState(!1);return t.jsxs(t.Fragment,{children:[t.jsx(n,{variant:"info",onClick:()=>{o(!0)},children:"Open multi select modal"}),t.jsx(m,{...p,show:a,setShow:o})]})}};var e,i,s;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`{
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
}`,...(s=(i=r.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const G=["Template"];export{r as Template,G as __namedExportsOrder,A as default};
//# sourceMappingURL=MultiSelectCrud.stories-5467cd0c.js.map
