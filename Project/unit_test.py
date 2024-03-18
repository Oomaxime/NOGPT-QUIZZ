import unittest
import re, cssutils, php, psycopg2, compileall

def can_compile_js_code(js_code):
    try:
        eval(js_code)
        return True
    except SyntaxError:
        return False

def can_compile_python(code):
    try:
        compileall.compile_string(code, '<string>', 'exec')
        return True
    except Exception:
        return False
    
'''
    Check si la sématique de base HTML est respecté
    Tu peux faire une fonction contain pour voir si un morceau de code attendu est dans le string
'''    

def can_compile_html(html_code):
    html_pattern = r'<!DOCTYPE html>\s*<html>\s*<head>\s*</head>\s*<body>\s*</body>\s*</html>'
    return bool(re.match(html_pattern, html_code))

def can_compile_css(css_code):
    try:
        cssutils.css.CSSParser().parseString(css_code)
        return True
    except cssutils.css.CSSSyntaxError:
        return False

def can_compile_php(php_code):
    try:
        php.Php().parse(php_code)
        return True
    except php.PhpError:
        return False


def can_compile_postgresql(postgresql_code):
    try:
        conn = psycopg2.connect(database="test", user="test", password="test", host="127.0.0.1", port="5432")
        cur = conn.cursor()
        cur.execute(postgresql_code)
        cur.close()
        conn.close()
        return True
    except psycopg2.Error:
        return False
    
'''
    Ajoutes les tests 
    Exemples :
        def test_can_compile_python(self):
            python_code = "print('Hello, world!')"
            self.assertTrue(can_compile_python(python_code))
        def test_cannot_compile_python(self):
            python_code = "prin('Hello, world!')"
            self.assertFalse(can_compile_python(python_code))
        def test_can_compile_html(self):
            html_code = '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n</body>\n</html>'
            self.assertTrue(can_compile_html(html_code))
        def test_cannot_compile_html(self):
            html_code = '<html>\n<head>\n</head>\n<body>\n</body>'
            self.assertFalse(can_compile_html(html_code))
        def test_can_compile_css(self):
            css_code = "body { color: red; }"
            self.assertTrue(can_compile_css(css_code))
        def test_cannot_compile_css(self):
            css_code = "body { colr: red; }"
            self.assertFalse(can_compile_css(css_code))
        def test_can_compile_php(self):
            php_code = "<?php echo 'Hello, world!'; ?>"
            self.assertTrue(can_compile_php(php_code))
        def test_cannot_compile_php(self):
            php_code = "<?pho echo 'Hello, world!'; ?>"
            self.assertFalse(can_compile_php(php_code))
        def test_can_compile_postgresql(self):
            postgresql_code = "SELECT 1;"
            self.assertTrue(can_compile_postgresql(postgresql_code))
        def test_cannot_compile_postgresql(self):
            postgresql_code = "SELECT 1;a"
            self.assertFalse(can_compile_postgresql(postgresql_code))
'''

if __name__ == '__main__':
    unittest.main()