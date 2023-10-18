import{j as e}from"./ThemeProvider-09f3a863.js";import{r as s}from"./index-76fb7be0.js";import{C as p}from"./index-3959417b.js";import{F as y}from"./index-b34d1557.js";import{F as f}from"./FormTypeSelect-2076be4a.js";import"./_commonjsHelpers-de833af9.js";import"./index-158a472d.js";import"./LoadingSpinner-7d259415.js";import"./useTranslation-7232bec6.js";import"./i18nInstance-1f8a4d28.js";import"./matchStrings-5a558dd8.js";import"./i18n-9fd04d21.js";import"./axios-7460e05c.js";import"./Row-5355c8a4.js";import"./Form-0553c23f.js";import"./index-8d47fad6.js";import"./useEventCallback-c7177fdc.js";import"./Button-ad68e730.js";import"./useGetQueryClient-2208cb6e.js";import"./index-23b5c7fd.js";import"./index.esm-a45aa266.js";import"./Button-880d3194.js";import"./index-f6399919.js";import"./index-d14a5900.js";import"./LoadingButton-41bc35b5.js";import"./index-d3ea75b5.js";import"./inheritsLoose-c82a83d4.js";import"./index-5fa36f7a.js";import"./index-d8ac0996.js";import"./index-862e6100.js";import"./index-e3f1c84d.js";import"./index-4b771f08.js";import"./FormTypeDate-76efc7f5.js";import"./FormTypeHtml-2e7f796d.js";import"./FormTypeNumber-630b6129.js";import"./FormTypePassword-2110b743.js";import"./FormTypeText-9fa44ea1.js";import"./FormTypeTextArea-9d9cfa8b.js";const oe={title:"Tables/Crud",component:p},x=[{accessorKey:"uuid",enableColumnFilter:!0,dropdown:!0},{accessorKey:"ean"},{accessorKey:"name"},{accessorKey:"description",header:"Desc.",enableColumnFilter:!0},{accessorKey:"price",header:"€"},{accessorKey:"category_id",header:"Cat.",cell:r=>r.row.original.category,enableColumnFilter:!0,fieldType:y.SELECT,selectOptionsUrl:"/api/get_options"}],t={args:{columns:x,enableGlobalFilter:!0,crudUrl:"/api/crud",canRefresh:!0,canExport:!0,exportName:"API Excel "},render:r=>{const[m,u]=s.useState(""),d=n=>{var a;u(n.target.value);const h={category_id:n.target.value};(a=o.current)==null||a.setLazyilters(h)},g=e.jsx(e.Fragment,{children:e.jsx(f,{handleChange:d,name:"Test change",controlId:"Test change",selectOptionsUrl:"/api/get_options",value:m})}),o=s.useRef(null);return e.jsx(p,{...r,customButtons:g,ref:o})}};var c,l,i;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(i=(l=t.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};const ne=["Api"];export{t as Api,ne as __namedExportsOrder,oe as default};
//# sourceMappingURL=Api.stories-da947e8a.js.map
