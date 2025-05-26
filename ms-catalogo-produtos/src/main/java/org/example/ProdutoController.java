package org.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    // Criar produto (ração)
    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
        Produto salvo = produtoRepository.save(produto);
        return ResponseEntity.ok(salvo);
    }

    // Listar todos os produtos
    @GetMapping
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    // Listar apenas produtos disponíveis
    @GetMapping("/disponiveis")
    public List<Produto> listarDisponiveis() {
        return produtoRepository.findByDisponibilidadeTrue();
    }

    // Buscar produto por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        return produtoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar produto
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        return produtoRepository.findById(id).map(produto -> {
            produto.setNome(produtoAtualizado.getNome());
            produto.setTipo(produtoAtualizado.getTipo());
            produto.setDescricao(produtoAtualizado.getDescricao());
            produto.setPeso(produtoAtualizado.getPeso());
            produto.setPreco(produtoAtualizado.getPreco());
            produto.setDisponibilidade(produtoAtualizado.isDisponibilidade());
            produtoRepository.save(produto);
            return ResponseEntity.ok(produto);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Remover produto
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerProduto(@PathVariable Long id) {
        return produtoRepository.findById(id).map(produto -> {
            produtoRepository.delete(produto);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
