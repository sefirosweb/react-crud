import{j as e}from"./ThemeProvider-a71a5aa9.js";import{r as s}from"./index-61bf1805.js";import{C as p}from"./index-09911b0c.js";import{F as y}from"./index-11f483a8.js";import{F as f}from"./FormTypeSelect-a02290b5.js";import"./_commonjsHelpers-de833af9.js";import"./index-46c535a1.js";import"./LoadingSpinner-ee85fb67.js";import"./useTranslation-9aad8729.js";import"./i18nInstance-1f8a4d28.js";import"./matchStrings-5a558dd8.js";import"./i18n-28032080.js";import"./axios-94372f69.js";import"./Row-b5cb55df.js";import"./Form-6057eae6.js";import"./index-8d47fad6.js";import"./createWithBsPrefix-e4b19ea9.js";import"./useEventCallback-2ca67dcc.js";import"./Button-aac535fb.js";import"./index-249823ed.js";import"./index.esm-1806526e.js";import"./Button-97fb7a83.js";import"./index-19ed8ea2.js";import"./useGetQueryClient-cbcca069.js";import"./index-7e0e44f4.js";import"./index-086f44c1.js";import"./LoadingButton-5a00958f.js";import"./index-2801d3c9.js";import"./inheritsLoose-c82a83d4.js";import"./index-2675dd19.js";import"./FormTypeDate-ad6bce75.js";import"./FormTypeHtml-bc29b9bd.js";import"./FormTypeNumber-343302cd.js";import"./FormTypePassword-3ad9ea3e.js";import"./FormTypeText-37a0c392.js";import"./FormTypeTextArea-3b3f545c.js";import"./index-ae92ecc3.js";import"./index-5be08948.js";import"./index-3fa57039.js";import"./index-b8849b91.js";const ae={title:"Tables/Crud",component:p},x=[{accessorKey:"uuid",enableColumnFilter:!0,dropdown:!0},{accessorKey:"ean"},{accessorKey:"name"},{accessorKey:"description",header:"Desc.",enableColumnFilter:!0},{accessorKey:"price",header:"€"},{accessorKey:"category_id",header:"Cat.",cell:r=>r.row.original.category,enableColumnFilter:!0,fieldType:y.SELECT,selectOptionsUrl:"/api/get_options"}],t={args:{columns:x,enableGlobalFilter:!0,crudUrl:"/api/crud",canRefresh:!0,canExport:!0,exportName:"API Excel "},render:r=>{const[m,u]=s.useState(""),d=n=>{var a;u(n.target.value);const h={category_id:n.target.value};(a=o.current)==null||a.setLazyilters(h)},g=e.jsx(e.Fragment,{children:e.jsx(f,{handleChange:d,name:"Test change",controlId:"Test change",selectOptionsUrl:"/api/get_options",value:m})}),o=s.useRef(null);return e.jsx(p,{...r,customButtons:g,ref:o})}};var c,l,i;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    columns: columns,
    enableGlobalFilter: true,
    crudUrl: \`/api/crud\`,
    canRefresh: true,
    canExport: true,
    exportName: "API Excel "
  },
  render: props => {
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
      const lazyFilter = {
        category_id: e.target.value
      };
      crudRef.current?.setLazyilters(lazyFilter);
    };
    const customButtons = <>
        <FormTypeSelect handleChange={handleChange} name='Test change' controlId='Test change' selectOptionsUrl={'/api/get_options'} value={selectedValue} />
      </>;
    const crudRef = useRef<PropsRef>(null);
    return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
  }
}`,...(i=(l=t.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};const se=["Api"];export{t as Api,se as __namedExportsOrder,ae as default};
//# sourceMappingURL=Api.stories-af642fc4.js.map
