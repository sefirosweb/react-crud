import{j as o}from"./ThemeProvider-a71a5aa9.js";import{r as l}from"./index-61bf1805.js";import{C as p}from"./index-bc20e28c.js";import{F as s}from"./index-11f483a8.js";import{F as f}from"./FormTypeSelect-a02290b5.js";import"./_commonjsHelpers-de833af9.js";import"./index-763d01f2.js";import"./LoadingSpinner-ee85fb67.js";import"./useTranslation-9aad8729.js";import"./i18nInstance-1f8a4d28.js";import"./matchStrings-5a558dd8.js";import"./i18n-2050a10d.js";import"./axios-94372f69.js";import"./Row-b5cb55df.js";import"./Form-6057eae6.js";import"./index-8d47fad6.js";import"./createWithBsPrefix-e4b19ea9.js";import"./useEventCallback-2ca67dcc.js";import"./Button-aac535fb.js";import"./index-249823ed.js";import"./index.esm-1806526e.js";import"./Button-97fb7a83.js";import"./index-b11ed130.js";import"./index-086f44c1.js";import"./LoadingButton-5a00958f.js";import"./index-2801d3c9.js";import"./inheritsLoose-c82a83d4.js";import"./index-2675dd19.js";import"./FormTypeDate-ad6bce75.js";import"./FormTypeHtml-bc29b9bd.js";import"./FormTypeNumber-343302cd.js";import"./FormTypePassword-3ad9ea3e.js";import"./FormTypeText-37a0c392.js";import"./FormTypeTextArea-3b3f545c.js";import"./index-1406dde3.js";import"./index-8b309e46.js";import"./useGetQueryClient-cbcca069.js";import"./index-5be08948.js";import"./index-3fa57039.js";import"./index-b9cefe9f.js";const{useState:F}=__STORYBOOK_MODULE_ADDONS__,ae={title:"Tables/Crud",component:p},h=[{accessorKey:"uuid",header:"UUID",enableColumnFilter:!0,dropdown:!0,getCellStyle:()=>({backgroundColor:"#e0cffc"})},{accessorKey:"ean",header:"EAN",getCellClass:()=>"bg-success"},{accessorKey:"name",header:"Name",enableColumnFilter:!0},{accessorKey:"description",header:"Desc.",enableColumnFilter:!0},{accessorKey:"price",header:"€",enableColumnFilter:!0,fieldType:s.NUMBER},{accessorKey:"category_id",header:"Cat.",cell:a=>a.row.original.category,enableColumnFilter:!0,fieldType:s.SELECT,selectOptionsUrl:"/api/get_options"}],n={args:{columns:h,enableGlobalFilter:!0,crudUrl:"/api/crud",lazyLoad:!0},render:a=>{const[m,d]=F("3"),t=l.useRef(null);l.useEffect(()=>{var e;const r={category_id:"3"};(e=t.current)==null||e.setLazyilters(r)},[]);const y=r=>{d(r.target.value);const e={category_id:r.target.value};e.category_id===""&&delete e.category_id,t.current&&t.current.setLazyilters(e)},g=o.jsx(o.Fragment,{children:o.jsx(f,{handleChange:y,controlId:"Test change",name:"Test change",selectOptionsUrl:"/api/get_options",value:m})});return o.jsx(p,{...a,customButtons:g,ref:t})}};var c,i,u;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(u=(i=n.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const le=["ApiLazyLoad"];export{n as ApiLazyLoad,le as __namedExportsOrder,ae as default};
//# sourceMappingURL=ApiLazyLoad.stories-b6350165.js.map
