import{j as o}from"./ThemeProvider-09f3a863.js";import{r as l}from"./index-76fb7be0.js";import{C as m}from"./index-7221261e.js";import{d as f}from"./Product-eb6928ef.js";import{B as R}from"./Button-880d3194.js";import"./_commonjsHelpers-de833af9.js";import"./index-c239b66d.js";import"./LoadingSpinner-7d259415.js";import"./useTranslation-7232bec6.js";import"./i18nInstance-1f8a4d28.js";import"./matchStrings-5a558dd8.js";import"./i18n-9fd04d21.js";import"./axios-7460e05c.js";import"./index-880ae827.js";import"./Form-0553c23f.js";import"./index-8d47fad6.js";import"./FormTypeDate-76efc7f5.js";import"./FormTypeHtml-2e7f796d.js";import"./FormTypeNumber-630b6129.js";import"./FormTypePassword-2110b743.js";import"./FormTypeSelect-0faa0588.js";import"./useGetQueryClient-7a930f35.js";import"./FormTypeText-9fa44ea1.js";import"./FormTypeTextArea-9d9cfa8b.js";import"./Row-5355c8a4.js";import"./useEventCallback-c7177fdc.js";import"./Button-ad68e730.js";import"./index-23b5c7fd.js";import"./index.esm-a45aa266.js";import"./index-e66407bd.js";import"./index-d14a5900.js";import"./LoadingButton-41bc35b5.js";import"./index-d3ea75b5.js";import"./inheritsLoose-c82a83d4.js";import"./index-160aba02.js";import"./index-192def1a.js";import"./index-862e6100.js";import"./index-e3f1c84d.js";import"./index-456e198c.js";import"./index-1c0e67c4.js";const eo={title:"Tables/Crud",component:m},C=[{accessorKey:"uuid",enableColumnFilter:!0},{accessorKey:"ean"},{accessorKey:"name"},{accessorKey:"description",header:"Desc."},{accessorKey:"price",header:"€"},{accessorKey:"category",header:"Cat."}],r={args:{columns:C,data:f,canSelectRow:!0},render:a=>{const t=l.useRef(null),p=()=>{var e;const u=(e=t.current)==null?void 0:e.getSelectedRows().map(d=>d.ean);console.log({eans:u})},i=o.jsx(o.Fragment,{children:o.jsx(R,{onClick:p,children:"Show selected row data"})});return o.jsx(m,{...a,customButtons:i,ref:t})}};var n,s,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    columns: columns,
    data: data,
    canSelectRow: true
  },
  render: props => {
    const crudRef = useRef<PropsRef>(null);
    const handleClick = () => {
      const eans = crudRef.current?.getSelectedRows<Product>().map(o => o.ean);
      console.log({
        eans
      });
    };
    const customButtons = <>
        <Button onClick={handleClick}>Show selected row data</Button>
      </>;
    return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
  }
}`,...(c=(s=r.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const no=["SelectRow"];export{r as SelectRow,no as __namedExportsOrder,eo as default};
//# sourceMappingURL=SelectRow.stories-10da535e.js.map
