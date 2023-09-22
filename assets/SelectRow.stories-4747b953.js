import{j as o}from"./ThemeProvider-09f3a863.js";import{r as l}from"./index-76fb7be0.js";import{C as m}from"./index-983f9833.js";import{d as f}from"./Product-d3a41160.js";import{B as R}from"./Button-880d3194.js";import"./_commonjsHelpers-de833af9.js";import"./index-2ce11de6.js";import"./LoadingSpinner-7d259415.js";import"./useTranslation-7232bec6.js";import"./i18nInstance-1f8a4d28.js";import"./matchStrings-5a558dd8.js";import"./i18n-9fd04d21.js";import"./axios-503983f7.js";import"./index-1716dfda.js";import"./Form-c707cc1e.js";import"./index-8d47fad6.js";import"./createWithBsPrefix-2998513f.js";import"./FormTypeDate-430a9028.js";import"./FormTypeHtml-e189c7f9.js";import"./FormTypeNumber-bca85b35.js";import"./FormTypePassword-157ba307.js";import"./FormTypeSelect-3634e20f.js";import"./useGetQueryClient-5c6c423d.js";import"./FormTypeText-940786e9.js";import"./FormTypeTextArea-c7676ee8.js";import"./Row-5355c8a4.js";import"./useEventCallback-c7177fdc.js";import"./Button-ad68e730.js";import"./index-23b5c7fd.js";import"./index.esm-a45aa266.js";import"./index-0c2e141e.js";import"./index-c93e2f2e.js";import"./LoadingButton-41bc35b5.js";import"./index-d3ea75b5.js";import"./inheritsLoose-c82a83d4.js";import"./index-64b682ff.js";import"./index-21433751.js";import"./index-862e6100.js";import"./index-e3f1c84d.js";import"./index-560bdad7.js";import"./index-20a54978.js";const no={title:"Tables/Crud",component:m},C=[{accessorKey:"uuid",enableColumnFilter:!0},{accessorKey:"ean"},{accessorKey:"name"},{accessorKey:"description",header:"Desc."},{accessorKey:"price",header:"€"},{accessorKey:"category",header:"Cat."}],r={args:{columns:C,data:f,canSelectRow:!0},render:a=>{const t=l.useRef(null),p=()=>{var e;const u=(e=t.current)==null?void 0:e.getSelectedRows().map(d=>d.ean);console.log({eans:u})},i=o.jsx(o.Fragment,{children:o.jsx(R,{onClick:p,children:"Show selected row data"})});return o.jsx(m,{...a,customButtons:i,ref:t})}};var n,s,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(c=(s=r.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const so=["SelectRow"];export{r as SelectRow,so as __namedExportsOrder,no as default};
//# sourceMappingURL=SelectRow.stories-4747b953.js.map
