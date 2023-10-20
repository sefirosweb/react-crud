import{j as o}from"./ThemeProvider-09f3a863.js";import{r as l}from"./index-76fb7be0.js";import{C as p}from"./index-7221261e.js";import{F as s}from"./index-880ae827.js";import{F as f}from"./FormTypeSelect-0faa0588.js";import"./_commonjsHelpers-de833af9.js";import"./index-c239b66d.js";import"./LoadingSpinner-7d259415.js";import"./useTranslation-7232bec6.js";import"./i18nInstance-1f8a4d28.js";import"./matchStrings-5a558dd8.js";import"./i18n-9fd04d21.js";import"./axios-7460e05c.js";import"./Row-5355c8a4.js";import"./Form-0553c23f.js";import"./index-8d47fad6.js";import"./useEventCallback-c7177fdc.js";import"./Button-ad68e730.js";import"./useGetQueryClient-7a930f35.js";import"./index-23b5c7fd.js";import"./index.esm-a45aa266.js";import"./Button-880d3194.js";import"./index-e66407bd.js";import"./index-d14a5900.js";import"./LoadingButton-41bc35b5.js";import"./index-d3ea75b5.js";import"./inheritsLoose-c82a83d4.js";import"./index-160aba02.js";import"./index-192def1a.js";import"./index-862e6100.js";import"./index-e3f1c84d.js";import"./index-456e198c.js";import"./FormTypeDate-76efc7f5.js";import"./FormTypeHtml-2e7f796d.js";import"./FormTypeNumber-630b6129.js";import"./FormTypePassword-2110b743.js";import"./FormTypeText-9fa44ea1.js";import"./FormTypeTextArea-9d9cfa8b.js";const{useState:F}=__STORYBOOK_MODULE_ADDONS__,oe={title:"Tables/Crud",component:p},h=[{accessorKey:"uuid",header:"UUID",enableColumnFilter:!0,dropdown:!0,getCellStyle:()=>({backgroundColor:"#e0cffc"})},{accessorKey:"ean",header:"EAN",getCellClass:()=>"bg-success"},{accessorKey:"name",header:"Name",enableColumnFilter:!0},{accessorKey:"description",header:"Desc.",enableColumnFilter:!0},{accessorKey:"price",header:"€",enableColumnFilter:!0,fieldType:s.NUMBER},{accessorKey:"category_id",header:"Cat.",cell:a=>a.row.original.category,enableColumnFilter:!0,fieldType:s.SELECT,selectOptionsUrl:"/api/get_options"}],n={args:{columns:h,enableGlobalFilter:!0,crudUrl:"/api/crud",lazyLoad:!0},render:a=>{const[m,d]=F("3"),t=l.useRef(null);l.useEffect(()=>{var e;const r={category_id:"3"};(e=t.current)==null||e.setLazyilters(r)},[]);const y=r=>{d(r.target.value);const e={category_id:r.target.value};e.category_id===""&&delete e.category_id,t.current&&t.current.setLazyilters(e)},g=o.jsx(o.Fragment,{children:o.jsx(f,{handleChange:y,controlId:"Test change",name:"Test change",selectOptionsUrl:"/api/get_options",value:m})});return o.jsx(p,{...a,customButtons:g,ref:t})}};var c,i,u;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    columns: columns,
    enableGlobalFilter: true,
    // enableGlobalFilterLabels,
    crudUrl: \`/api/crud\`,
    lazyLoad: true
  },
  render: props => {
    const [selectedValue, setSelectedValue] = useState("3");
    const crudRef = useRef<PropsRef>(null);
    useEffect(() => {
      const lazyFilter: Record<string, any> = {
        category_id: "3"
      };
      crudRef.current?.setLazyilters(lazyFilter);
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
      const lazyFilter: Record<string, any> = {
        category_id: e.target.value
      };
      if (lazyFilter.category_id === "") {
        delete lazyFilter.category_id;
      }
      if (crudRef.current) {
        crudRef.current.setLazyilters(lazyFilter);
      }
    };
    const customButtons = <>
        <FormTypeSelect handleChange={handleChange} controlId="Test change" name="Test change" selectOptionsUrl={"/api/get_options"} value={selectedValue} />
      </>;
    return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
  }
}`,...(u=(i=n.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const ne=["ApiLazyLoad"];export{n as ApiLazyLoad,ne as __namedExportsOrder,oe as default};
//# sourceMappingURL=ApiLazyLoad.stories-99ca377e.js.map
