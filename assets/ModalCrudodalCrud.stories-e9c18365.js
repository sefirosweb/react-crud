import{j as t}from"./ThemeProvider-09f3a863.js";import{r as c}from"./index-76fb7be0.js";import{M as l}from"./index-0c2e141e.js";import{T}from"./Product-d3a41160.js";import{B as p}from"./Button-880d3194.js";import"./_commonjsHelpers-de833af9.js";import"./index-c93e2f2e.js";import"./LoadingButton-41bc35b5.js";import"./LoadingSpinner-7d259415.js";import"./useTranslation-7232bec6.js";import"./i18nInstance-1f8a4d28.js";import"./useEventCallback-c7177fdc.js";import"./index-d3ea75b5.js";import"./inheritsLoose-c82a83d4.js";import"./createWithBsPrefix-2998513f.js";import"./index-8d47fad6.js";import"./index-1716dfda.js";import"./Form-c707cc1e.js";import"./FormTypeDate-430a9028.js";import"./FormTypeHtml-e189c7f9.js";import"./FormTypeNumber-bca85b35.js";import"./FormTypePassword-157ba307.js";import"./FormTypeSelect-3634e20f.js";import"./useGetQueryClient-5c6c423d.js";import"./axios-503983f7.js";import"./FormTypeText-940786e9.js";import"./FormTypeTextArea-c7676ee8.js";import"./index-64b682ff.js";import"./index-2ce11de6.js";import"./matchStrings-5a558dd8.js";import"./i18n-9fd04d21.js";import"./Row-5355c8a4.js";import"./Button-ad68e730.js";import"./index-21433751.js";import"./index-862e6100.js";import"./index.esm-a45aa266.js";import"./index-20a54978.js";const rt={title:"Form/ModalCrud",component:l},r={args:{fields:T},render:m=>{const{accept:e,fields:d}=m,[C,o]=c.useState(!1),[f,s]=c.useState("CREATE"),h=(E,S)=>{console.log(E),console.log(S)},[B,n]=c.useState("Accept");return t.jsxs(t.Fragment,{children:[t.jsx("p",{children:t.jsx(p,{variant:"success",onClick:()=>{n(e||"Create"),s("CREATE"),o(!0)},children:"Create"})}),t.jsx("p",{children:t.jsx(p,{variant:"warning",onClick:()=>{n(e||"Update"),s("UPDATE"),o(!0)},children:"Update"})}),t.jsx("p",{children:t.jsx(p,{variant:"danger",onClick:()=>{n(e||"Delete"),s("DELETE"),o(!0)},children:"Delete"})}),t.jsx(l,{fields:d,show:C,setShow:o,accept:B,crud:f,url:"/api/crud",primaryKey:"id",handleSuccess:h,titleOnDelete:"name",title:"Custom Title for CRUD"})]})}};var i,a,u;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    fields: TestColumnsModel
  },
  render: props => {
    const {
      accept,
      fields
    } = props;
    const [show, setShow] = useState(false);
    const [crud, setCrud] = useState<CrudType>("CREATE");
    const handleSuccess = (response: any, crud: CrudType) => {
      console.log(response);
      console.log(crud);
    };
    const [acceptButton, setAcceptButton] = useState("Accept");
    return <>
        <p>
          <Button variant="success" onClick={() => {
          if (!accept) {
            setAcceptButton("Create");
          } else {
            setAcceptButton(accept);
          }
          setCrud("CREATE");
          setShow(true);
        }}>
            Create
          </Button>
        </p>
        <p>
          <Button variant="warning" onClick={() => {
          if (!accept) {
            setAcceptButton("Update");
          } else {
            setAcceptButton(accept);
          }
          setCrud("UPDATE");
          setShow(true);
        }}>
            Update
          </Button>
        </p>
        <p>
          <Button variant="danger" onClick={() => {
          if (!accept) {
            setAcceptButton("Delete");
          } else {
            setAcceptButton(accept);
          }
          setCrud("DELETE");
          setShow(true);
        }}>
            Delete
          </Button>
        </p>

        <ModalCrud fields={fields} show={show} setShow={setShow} accept={acceptButton} crud={crud} url={"/api/crud"} primaryKey="id" handleSuccess={handleSuccess} titleOnDelete="name" title="Custom Title for CRUD" />
      </>;
  }
}`,...(u=(a=r.parameters)==null?void 0:a.docs)==null?void 0:u.source}}};const st=["Template"];export{r as Template,st as __namedExportsOrder,rt as default};
//# sourceMappingURL=ModalCrudodalCrud.stories-e9c18365.js.map
