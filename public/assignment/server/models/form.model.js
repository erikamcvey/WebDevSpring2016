var forms = require("./form.mock.json");
//var uuid = require("node-uuid");

module.exports = function(db, mongoose) {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        getFieldsByFormId: getFieldsByFormId,
        getField: getField,
        createField: createField,
        deleteField: deleteField
    };
    return api;

    function createForm(form) {
        form._id = (new Date()).getTime();
        forms.push(form);
    }

    function findAllForms() {
        return forms;
    }

    function findFormsByUserId(userId) {
        var userForms = [];
        for (var i = 0; i < forms.length; i++) {
            var curForm = forms[i];
            if (curForm.userId == userId) {
                userForms.push(curForm);
            }
        }
        return userForms;
    }

    function findFormById(formId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i] == formId) {
                return forms[i];
            }
        }
    }

    function updateForm(formId, newForm) {
        for (var i = 0; i < forms.length(); i++) {
            var form = forms[i];
            if (form._id == formId) {
                forms[i] = newForm;
            }
        }
    }

    function deleteFormById(formId) {
        var form = findFormById(formId);
        if (form) {
            var index = forms.indexOf(form);
            forms.splice(index, 1);
        }
    }

    function findFormByTitle(title) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i] == title) {
                return forms[i];
            }
        }
    }

    function getFieldsByFormId(formId) {
        var form = findFormById(formId);
        if (form) {
            return form.fields;
        } else {
            //should this be an error instead, since this means form doesn't exist?
            return [];
        }
    }

    function getField(formId, fieldId) {
        var form = findFormById(formId);
        for(var i = 0; i < form.fields.length; i++) {
            var field = form.fields[i];
            if (field._id == fieldId) {
                return field;
            }
        }
        // return an empty map for an empty field? or break? or error?
        return {};
    }

    function createField(formId, field) {
        var form = findFormById(formId);

        if (form) {
            form.fields.push(field);
        }
    }

    function deleteField(formId, fieldId) {
        var form = findFormById(formId);
        if (form) {
            var field = getField(formId, fieldId);
            if (field) {
                var index = form.fields.indexOf(field);
                form.fields.splice(index, 1);
            }
        }
    }

    function updateField(formId, fieldId, newField) {
        var form = findFormById(formId);
        if (form) {
            var field = getField(formId, fieldId);
            if (field) {
                var index = form.fields.indexOf(field);
                form.fields[index] = newField;
            }
        }
    }
};