import{j as t}from"./ThemeProvider-a71a5aa9.js";import{r as c}from"./index-61bf1805.js";import{M as l}from"./index-7e0e44f4.js";import{T}from"./Product-485710e0.js";import{B as p}from"./Button-97fb7a83.js";import"./_commonjsHelpers-de833af9.js";import"./index-086f44c1.js";import"./LoadingButton-5a00958f.js";import"./LoadingSpinner-ee85fb67.js";import"./useTranslation-9aad8729.js";import"./i18nInstance-1f8a4d28.js";import"./useEventCallback-2ca67dcc.js";import"./index-2801d3c9.js";import"./inheritsLoose-c82a83d4.js";import"./createWithBsPrefix-e4b19ea9.js";import"./index-8d47fad6.js";import"./index-2675dd19.js";import"./Form-6057eae6.js";import"./FormTypeDate-ad6bce75.js";import"./FormTypeHtml-bc29b9bd.js";import"./FormTypeNumber-343302cd.js";import"./FormTypePassword-3ad9ea3e.js";import"./FormTypeSelect-a02290b5.js";import"./useGetQueryClient-cbcca069.js";import"./axios-94372f69.js";import"./FormTypeText-37a0c392.js";import"./FormTypeTextArea-3b3f545c.js";import"./index-11f483a8.js";import"./index-ae92ecc3.js";import"./index-46c535a1.js";import"./matchStrings-5a558dd8.js";import"./i18n-28032080.js";import"./Row-b5cb55df.js";import"./Button-aac535fb.js";import"./index-19ed8ea2.js";import"./index-5be08948.js";import"./index.esm-1806526e.js";import"./index-1edb519e.js";const st={title:"Form/ModalCrud",component:l},r={args:{fields:T},render:m=>{const{accept:e,fields:d}=m,[C,o]=c.useState(!1),[f,s]=c.useState("CREATE"),h=(E,S)=>{console.log(E),console.log(S)},[B,n]=c.useState("Accept");return t.jsxs(t.Fragment,{children:[t.jsx("p",{children:t.jsx(p,{variant:"success",onClick:()=>{n(e||"Create"),s("CREATE"),o(!0)},children:"Create"})}),t.jsx("p",{children:t.jsx(p,{variant:"warning",onClick:()=>{n(e||"Update"),s("UPDATE"),o(!0)},children:"Update"})}),t.jsx("p",{children:t.jsx(p,{variant:"danger",onClick:()=>{n(e||"Delete"),s("DELETE"),o(!0)},children:"Delete"})}),t.jsx(l,{fields:d,show:C,setShow:o,accept:B,crud:f,url:"/api/crud",primaryKey:"id",handleSuccess:h,titleOnDelete:"name",title:"Custom Title for CRUD"})]})}};var i,a,u;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(u=(a=r.parameters)==null?void 0:a.docs)==null?void 0:u.source}}};const ct=["Template"];export{r as Template,ct as __namedExportsOrder,st as default};
//# sourceMappingURL=ModalCrudodalCrud.stories-b363497e.js.map
