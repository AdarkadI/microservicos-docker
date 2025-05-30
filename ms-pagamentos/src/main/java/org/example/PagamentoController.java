package org.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pagamentos")
public class PagamentoController {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    private final Random random = new Random();

    // Simular processamento de pagamento
    @PostMapping("/processar")
    public ResponseEntity<Pagamento> processarPagamento(@RequestBody Pagamento pagamento) {
        // Simulação simples: 80% de chance de sucesso
        boolean sucesso = random.nextDouble() < 0.8;

        pagamento.setStatus(sucesso ? "CONFIRMADO" : "FALHA");

        Pagamento pago = pagamentoRepository.save(pagamento);
        return ResponseEntity.ok(pago);
    }

    // Listar todos pagamentos
    @GetMapping
    public List<Pagamento> listarTodos() {
        return pagamentoRepository.findAll();
    }

    // Consultar pagamentos por pedido
    @GetMapping("/pedido/{idPedido}")
    public List<Pagamento> buscarPorPedido(@PathVariable Long idPedido) {
        return pagamentoRepository.findByIdPedido(idPedido);
    }

    // Buscar pagamento por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        return pagamentoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
