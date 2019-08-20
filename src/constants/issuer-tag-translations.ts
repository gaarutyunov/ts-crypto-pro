import {TagTranslation} from "../helpers/tag-translation";

export const issuerTagTranslations: TagTranslation[] = [
	{possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя'},
	{possibleNames: ['CN'], translation: 'Удостоверяющий центр'},
	{possibleNames: ['S'], translation: 'Регион'},
	{possibleNames: ['C'], translation: 'Страна'},
	{possibleNames: ['STREET'], translation: 'Адрес'},
	{possibleNames: ['O'], translation: 'Компания'},
	{possibleNames: ['OU'], translation: 'Тип'},
	{possibleNames: ['T'], translation: 'Должность'},
	{possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН'},
	{possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП'},
	{possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС'},
	{possibleNames: ['ИНН', 'INN'], translation: 'ИНН'},
	{possibleNames: ['E'], translation: 'Email'},
	{possibleNames: ['L'], translation: 'Город'}
];
