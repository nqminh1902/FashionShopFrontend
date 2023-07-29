import type { ProductModel } from '@/models';
import type {
    DxButton,
    DxSelectBox,
    DxTextArea,
    DxTextBox,
} from 'devextreme-vue';
import i18n from '@/locales/i18n';
const t = i18n.t;

const product = ref<ProductModel>({
    ProductID: 1,
    ProductName: 'Ghế siêu xịn vip pro',
    ProductCode: 'P001',
    ProductImage: [
        '/FAON/src/assets/images/demo/75.jpg',
        '/FAON/src/assets/images/demo/76.jpg',
        '/FAON/src/assets/images/demo/77.jpg',
        '/FAON/src/assets/images/demo/78.jpg',
        '/FAON/src/assets/images/demo/79.jpg',
    ],
    Description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor, or randomized words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of the text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humor, or non-characteristic words, etc. \n On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammeled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.",
    Summary:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit Sunt necessitatibus, et inventore qui vel illum iure debitis laudantium, hic veritatis molestias, assumenda eum dolorum alias atque sit nihil fuga quasi?',
    Price: 18000000,
    Sale: 12000,
    DiscountPercent: 16,
    Quantity: 10,
    CollectionID: 1,
    CollectionName: 'Bộ sưu tập mùa xuân',
});

const buttonCommentConfig: DxButton = {
    width: '100%',
    text: t('base.button.send'),
};

const colorSelectBoxConfig: DxSelectBox = {
    dataSource: ['red', 'orange', 'black'],
    width: '100%',
};

const sizeSelectBoxConfig: DxSelectBox = {
    dataSource: ['apple', 'panana', 'orange'],
    width: '100%',
};

const textAreaConfig: DxTextArea = {
    height: 96,
    maxHeight: 96,
    placeholder: t('base.textArea.message'),
};

const textBoxConfig: DxTextBox = {
    placeholder: t('base.general.typeValue'),
};

export {
    textBoxConfig,
    textAreaConfig,
    sizeSelectBoxConfig,
    buttonCommentConfig,
    colorSelectBoxConfig,
    product,
};
