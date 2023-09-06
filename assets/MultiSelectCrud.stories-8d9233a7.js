import{j as t}from"./ThemeProvider-a71a5aa9.js";import{r as l}from"./index-61bf1805.js";import{M as s}from"./index-76c9199d.js";import{B as n}from"./Button-97fb7a83.js";import"./_commonjsHelpers-de833af9.js";import"./index-086f44c1.js";import"./LoadingButton-5a00958f.js";import"./LoadingSpinner-ee85fb67.js";import"./useTranslation-9aad8729.js";import"./i18nInstance-1f8a4d28.js";import"./useEventCallback-2ca67dcc.js";import"./index-2801d3c9.js";import"./inheritsLoose-c82a83d4.js";import"./createWithBsPrefix-e4b19ea9.js";import"./index-8d47fad6.js";import"./index-e46df336.js";import"./index-08f36b8f.js";import"./matchStrings-5a558dd8.js";import"./i18n-2050a10d.js";import"./axios-94372f69.js";import"./index-a64f52dd.js";import"./Form-6057eae6.js";import"./FormTypeDate-ad6bce75.js";import"./FormTypeHtml-bc29b9bd.js";import"./FormTypeNumber-343302cd.js";import"./FormTypePassword-3ad9ea3e.js";import"./FormTypeSelect-a02290b5.js";import"./useGetQueryClient-cbcca069.js";import"./FormTypeText-37a0c392.js";import"./FormTypeTextArea-3b3f545c.js";import"./Row-b5cb55df.js";import"./Button-aac535fb.js";import"./index-8b309e46.js";import"./index-5be08948.js";import"./index.esm-1806526e.js";const Q={title:"Form/MultiSelectCrud",component:s},u=[{accessorKey:"uuid",enableHiding:!0},{accessorKey:"name"},{accessorKey:"category"}],r={args:{primaryKey:"uuid",primaryKeyId:"1",crudUrl:"/api/sub_table",getDataUrl:"/api/get_options",title:"Title for CRUD",columns:u},render:p=>{const[a,o]=l.useState(!1);return t.jsxs(t.Fragment,{children:[t.jsx(n,{variant:"info",onClick:()=>{o(!0)},children:"Open multi select modal"}),t.jsx(s,{...p,show:a,setShow:o})]})}};var e,i,m;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`{
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
//# sourceMappingURL=MultiSelectCrud.stories-8d9233a7.js.map
