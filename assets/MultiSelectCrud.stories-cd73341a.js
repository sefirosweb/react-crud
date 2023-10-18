import{j as t}from"./ThemeProvider-09f3a863.js";import{r as l}from"./index-76fb7be0.js";import{M as s}from"./index-4b771f08.js";import{B as n}from"./Button-880d3194.js";import"./_commonjsHelpers-de833af9.js";import"./index-d14a5900.js";import"./LoadingButton-41bc35b5.js";import"./LoadingSpinner-7d259415.js";import"./useTranslation-7232bec6.js";import"./i18nInstance-1f8a4d28.js";import"./useEventCallback-c7177fdc.js";import"./index-d3ea75b5.js";import"./inheritsLoose-c82a83d4.js";import"./index-8d47fad6.js";import"./index-5fa36f7a.js";import"./index-158a472d.js";import"./matchStrings-5a558dd8.js";import"./i18n-9fd04d21.js";import"./axios-7460e05c.js";import"./index-b34d1557.js";import"./Form-0553c23f.js";import"./FormTypeDate-76efc7f5.js";import"./FormTypeHtml-2e7f796d.js";import"./FormTypeNumber-630b6129.js";import"./FormTypePassword-2110b743.js";import"./FormTypeSelect-2076be4a.js";import"./useGetQueryClient-2208cb6e.js";import"./FormTypeText-9fa44ea1.js";import"./FormTypeTextArea-9d9cfa8b.js";import"./Row-5355c8a4.js";import"./Button-ad68e730.js";import"./index-d8ac0996.js";import"./index-862e6100.js";import"./index.esm-a45aa266.js";const P={title:"Form/MultiSelectCrud",component:s},u=[{accessorKey:"uuid",enableHiding:!0},{accessorKey:"name"},{accessorKey:"category"}],r={args:{primaryKey:"uuid",primaryKeyId:"1",crudUrl:"/api/sub_table",getDataUrl:"/api/get_options",title:"Title for CRUD",columns:u},render:p=>{const[a,o]=l.useState(!1);return t.jsxs(t.Fragment,{children:[t.jsx(n,{variant:"info",onClick:()=>{o(!0)},children:"Open multi select modal"}),t.jsx(s,{...p,show:a,setShow:o})]})}};var e,i,m;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`{
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
}`,...(m=(i=r.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const Q=["Template"];export{r as Template,Q as __namedExportsOrder,P as default};
//# sourceMappingURL=MultiSelectCrud.stories-cd73341a.js.map
