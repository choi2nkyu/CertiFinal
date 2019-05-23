import { expect } from 'chai'
import { shallowMount, createLocalVue} from '@vue/test-utils'
import { storeTest } from '@/store.js'
import GeneralAccount from '@/views/GeneralAccount.vue'
import { mutations } from '@/store.js'
import { actions} from '@/store.js'
import Vuex from 'vuex'


   const state = {
        ACCOUNTS: [],
        EXPENSE_CATEGORIES: [{ name: 'Add...' },
          { name: 'Expenses' }, { name: 'Transference' }, { name: 'Other' }],
        INCOME_CATEGORIES: [{ name: 'Add...' },
          { name: 'Salary' }, { name: 'Other' }],
        INCOMES: [
            {   name: 'Income1',
            category: 'Salary',
            amount:'100',
            account: 'a',
            date: '25/05/2019',
            _rowVariant:'success'
            },
            {   name:'Income2',
            category: 'Other',
            amount: '100',
            account: '',
            date: '25/05/2019',
            _rowVariant:'success'
            }   

        ],
        EXPENSES: [
            {   name: 'Expense1',
            category: 'Expenses',
            amount:'100',
            account: '100',
            date: '25/05/2019',
            _rowVariant:'danger'
            },
            {   name:'Expense2',
            category: 'Other',
            amount: '200',
            account: '',
            date: '25/05/2019',
            _rowVariant:'danger'
            }   
        ],
        DATES: [],
        CURRENT_ITEM: { name: '' },
        CURRENT_ACCOUNT: {},
        count: 0,
        id: 0
      }

suite('Cuenta Global', () => {
    let store;
    let wrapper;  

    setup(function() {    
        store = new Vuex.Store({
            state,
            mutations,
            actions
        })
      wrapper = shallowMount(GeneralAccount, {store})
    })
  
    test('Income Filter Working', () => {    

        var incomeCategoryDisplay = wrapper.find('#incomeFilter');
        var expenseCategoryDisplay = wrapper.find('#expenseFilter');
        var dateDisplay = wrapper.find('#dateFilter');
        
        dateDisplay.setValue('');
        expenseCategoryDisplay.setValue('None');
        incomeCategoryDisplay.setValue('All');

        expect(wrapper.vm.items.length).to.equal(2);
       
    })

    test('Expense Filter Working', () => {    

        var incomeCategoryDisplay = wrapper.find('#incomeFilter');
        var expenseCategoryDisplay = wrapper.find('#expenseFilter');
        var dateDisplay = wrapper.find('#dateFilter');
        
        dateDisplay.setValue('');
        expenseCategoryDisplay.setValue('All');
        incomeCategoryDisplay.setValue('None');

        expect(wrapper.vm.items.length).to.equal(2);
       
    })
    test('Income-Expense Filter Working together 1 ', () => {    

        var incomeCategoryDisplay = wrapper.find('#incomeFilter');
        var expenseCategoryDisplay = wrapper.find('#expenseFilter');
        var dateDisplay = wrapper.find('#dateFilter');
        
        dateDisplay.setValue('');
        expenseCategoryDisplay.setValue('None');
        incomeCategoryDisplay.setValue('None');

        expect(wrapper.vm.items.length).to.equal(0);
       
    })

    test('Income-Expense Filter Working together 2 ', () => {    

        var incomeCategoryDisplay = wrapper.find('#incomeFilter');
        var expenseCategoryDisplay = wrapper.find('#expenseFilter');
        var dateDisplay = wrapper.find('#dateFilter');
        
        dateDisplay.setValue('');
        expenseCategoryDisplay.setValue('All');
        incomeCategoryDisplay.setValue('All');

        expect(wrapper.vm.items.length).to.equal(4);
       
    })

    test('Date Filter Working', () => {    

        var incomeCategoryDisplay = wrapper.find('#incomeFilter');
        var expenseCategoryDisplay = wrapper.find('#expenseFilter');
        var dateDisplay = wrapper.find('#dateFilter');
        
        dateDisplay.setValue('25/05/2019');
        expenseCategoryDisplay.setValue('All');
        incomeCategoryDisplay.setValue('All');

        expect(wrapper.vm.items.length).to.equal(4);
       
    })
})